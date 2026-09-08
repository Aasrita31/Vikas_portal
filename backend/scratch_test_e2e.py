import urllib.request
import json

BASE_URL = "http://localhost:5000"

def post_json(path, data, token=None):
    url = f"{BASE_URL}{path}"
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers=headers, method="POST")
    with urllib.request.urlopen(req) as resp:
        return resp.getcode(), json.loads(resp.read().decode('utf-8'))

def get_json(path, token=None):
    url = f"{BASE_URL}{path}"
    headers = {}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    req = urllib.request.Request(url, headers=headers, method="GET")
    with urllib.request.urlopen(req) as resp:
        return resp.getcode(), json.loads(resp.read().decode('utf-8'))

import time
test_email = f"test_user_{int(time.time())}@aerotech.in"

print("=== 1. Testing Registration ===")
reg_payload = {
    "name": "Dr. Ananya Sharma",
    "organization": "AeroDynamics Tech Labs",
    "email": test_email,
    "phone": "9876543210",
    "location": "Bengaluru, Karnataka",
    "password": "SecurePassword#2026",
    "stakeholderType": "Startup",
    "domains": ["PNT / NavIC / GNSS", "IoT / Sensor Fusion"],
    "intentOfEngagement": "Collaborative R&D & Technology Incubation",
    "problemStatement": "Developing next-generation dual-band NavIC receiver for airborne telemetry.",
    "dynamicInputs": {
        "stage": "Prototype",
        "teamSize": "6 - 15"
    }
}

code, reg_res = post_json("/api/v1/auth/register", reg_payload)
print(f"Registration status: {code}")
assert code == 200
token = reg_res["token"]
user = reg_res["user"]
app = reg_res["application"]
print(f"User created: ID={user['id']}, Role={user['role']}, StakeholderType={user['stakeholder_type']}")
print(f"Application created: FileNumber={app['fileNumber']}, AssignedVerticals={app.get('assignedVerticals')}")

assert user["role"].lower() == "applicant"
assert user["stakeholder_type"] == "STARTUP"
assert "6.2 Startups & Business Enablement" in app["assignedVerticals"]
assert "6.1 Technology Development" in app["assignedVerticals"]

print("=== 2. Testing Scoped /auth/me ===")
code, me_res = get_json("/api/v1/auth/me", token=token)
print(f"Auth me status: {code}")
assert code == 200
assert me_res["user"]["email"] == test_email
assert len(me_res["applications"]) == 1
assert me_res["applications"][0]["fileNumber"] == app["fileNumber"]
print(f"Permissions for applicant: {me_res['permissions']}")
assert me_res["permissions"]["can_screen"] == False
assert me_res["permissions"]["can_route"] == False
assert me_res["permissions"]["can_approve_pillar"] == False
assert me_res["permissions"]["can_approve_pd"] == False
assert me_res["permissions"]["can_esign"] == False
assert me_res["permissions"]["can_advance_stage"] == False

print("=== 3. Testing Login with New Credentials ===")
login_payload = {
    "email": test_email,
    "password": "SecurePassword#2026"
}
code, login_res = post_json("/api/v1/auth/login", login_payload)
print(f"Login status: {code}")
assert code == 200
assert login_res["token"] is not None
assert login_res["user"]["email"] == test_email
print("SUCCESS: End-to-end backend registration and authentication passed completely!")
