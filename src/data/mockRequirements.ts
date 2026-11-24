import { Requirement } from "@/types";

export const mockRequirements: Requirement[] = [
  {
    id: "FR-001",
    projectId: "proj-finvault",
    projectName: "FinVault Payment Gateway",
    title: "User & Merchant Registration",
    description:
      "Merchants and end-users must be able to register with email verification and strong password hashing.",
    category: "Functional",
    priority: "High",
    status: "Implemented",
    matchScore: 96,
    matchedFiles: ["src/usecases/register_user.py", "src/api/auth_routes.py"],
    matchedFunctions: ["register_merchant", "hash_password_argon2"],
    evidence: [
      {
        file: "src/usecases/register_user.py",
        lineStart: 18,
        lineEnd: 34,
        snippet: `def register_merchant(payload: RegisterDTO, repo: UserRepository):
    validate_email(payload.email)
    password_hash = hash_password_argon2(payload.password)
    return repo.create_user(payload.email, password_hash)`,
      },
    ],
  },
  {
    id: "FR-002",
    projectId: "proj-finvault",
    projectName: "FinVault Payment Gateway",
    title: "Authenticated Session & Token Issuance",
    description:
      "Users should be able to log in securely using short-lived JWTs with rotating refresh tokens.",
    category: "Security",
    priority: "Critical",
    status: "Partially Implemented",
    matchScore: 72,
    matchedFiles: ["src/api/auth_routes.py", "src/infra/jwt_provider.py"],
    matchedFunctions: ["login_user", "issue_access_token"],
    evidence: [
      {
        file: "src/infra/jwt_provider.py",
        lineStart: 12,
        lineEnd: 24,
        snippet: `def issue_access_token(user_id: str) -> str:
    # Warning: refresh token rotation not enforced in current handler
    return jwt.encode({"sub": user_id}, SECRET_KEY, algorithm="HS256")`,
      },
    ],
  },
  {
    id: "FR-003",
    projectId: "proj-finvault",
    projectName: "FinVault Payment Gateway",
    title: "Idempotent Payment Execution",
    description:
      "Payment transfers must enforce idempotency keys and parameterized ledger writes to prevent duplicate charges.",
    category: "Functional",
    priority: "Critical",
    status: "Partially Implemented",
    matchScore: 68,
    matchedFiles: ["src/usecases/process_payment.py"],
    matchedFunctions: ["execute_transfer"],
    evidence: [
      {
        file: "src/usecases/process_payment.py",
        lineStart: 41,
        lineEnd: 56,
        snippet: `def execute_transfer(order_id: str, amount: float, db):
    query = f"SELECT * FROM transactions WHERE order_id = '{order_id}'"
    return db.execute(query)`,
      },
    ],
  },
  {
    id: "FR-004",
    projectId: "proj-finvault",
    projectName: "FinVault Payment Gateway",
    title: "Audit Trail for Refund Approvals",
    description:
      "All refund approvals above $500 must record actor ID, timestamp, and reason in an immutable audit log.",
    category: "Security",
    priority: "High",
    status: "Missing",
    matchScore: 14,
    matchedFiles: [],
    matchedFunctions: [],
    evidence: [],
  },
  {
    id: "FR-005",
    projectId: "proj-medipulse",
    projectName: "MediPulse Patient Portal",
    title: "Role-Based Access Control for Patient Records",
    description:
      "Only assigned physicians and the authenticated patient may view diagnostic lab reports.",
    category: "Security",
    priority: "Critical",
    status: "Implemented",
    matchScore: 94,
    matchedFiles: ["src/middleware/rbacGuard.ts", "src/controllers/recordsController.ts"],
    matchedFunctions: ["verifyRecordOwnership", "getLabReport"],
    evidence: [
      {
        file: "src/middleware/rbacGuard.ts",
        lineStart: 9,
        lineEnd: 21,
        snippet: `export function verifyRecordOwnership(user: AuthUser, patientId: string) {
  if (user.role === "PATIENT" && user.id !== patientId) {
    throw new ForbiddenError("Unauthorized record access");
  }
}`,
      },
    ],
  },
  {
    id: "FR-006",
    projectId: "proj-medipulse",
    projectName: "MediPulse Patient Portal",
    title: "Appointment Search & Filtering",
    description:
      "Patients can search available specialist slots by department, date, and clinic location.",
    category: "Functional",
    priority: "Medium",
    status: "Implemented",
    matchScore: 91,
    matchedFiles: ["src/controllers/appointmentController.ts"],
    matchedFunctions: ["searchAvailableSlots"],
    evidence: [
      {
        file: "src/controllers/appointmentController.ts",
        lineStart: 28,
        lineEnd: 38,
        snippet: `export async function searchAvailableSlots(req: Request, res: Response) {
  const slots = await appointmentModel.findSlots(req.query);
  return res.json({ slots });
}`,
      },
    ],
  },
  {
    id: "FR-007",
    projectId: "proj-cloudcart",
    projectName: "CloudCart Commerce Core",
    title: "Admin Product Catalog Management",
    description:
      "Administrators should be able to create, update, and archive products with input validation.",
    category: "Functional",
    priority: "High",
    status: "Implemented",
    matchScore: 89,
    matchedFiles: ["src/main/java/com/cloudcart/service/ProductService.java"],
    matchedFunctions: ["createProduct", "updateInventory"],
    evidence: [],
  },
  {
    id: "FR-008",
    projectId: "proj-cloudcart",
    projectName: "CloudCart Commerce Core",
    title: "Checkout Response Latency",
    description:
      "Checkout confirmation API should respond within 300ms at p95 under normal load.",
    category: "Performance",
    priority: "Medium",
    status: "Partially Implemented",
    matchScore: 63,
    matchedFiles: ["src/main/java/com/cloudcart/controller/CheckoutController.java"],
    matchedFunctions: ["submitOrder"],
    evidence: [],
  },
];
