import { SecurityFinding } from "@/types";

export const mockFindings: SecurityFinding[] = [
  {
    id: "SEC-101",
    analysisId: "ANL-2026-084",
    projectId: "proj-finvault",
    projectName: "FinVault Payment Gateway",
    title: "SQL Injection in Transaction Lookup",
    category: "SQL Injection",
    cwe: "CWE-89",
    file: "src/usecases/process_payment.py",
    line: 42,
    severity: "Critical",
    status: "Open",
    explanation:
      "User-supplied `order_id` is interpolated directly into a raw SQL query string using an f-string without parameterization.",
    impact:
      "An attacker can manipulate the `order_id` parameter to read sensitive payment records, bypass authorization checks, or modify database tables.",
    vulnerableCode: `def execute_transfer(order_id: str, amount: float, db):
    query = f"SELECT * FROM transactions WHERE order_id = '{order_id}'"
    return db.execute(query).fetchone()`,
    secureCode: `def execute_transfer(order_id: str, amount: float, db):
    query = "SELECT * FROM transactions WHERE order_id = :order_id"
    return db.execute(query, {"order_id": order_id}).fetchone()`,
    remediationSteps: [
      "Replace string interpolation with parameterized SQL bindings.",
      "Validate `order_id` against a strict UUID or alphanumeric pattern at the API boundary.",
      "Restrict database user privileges to least-privilege read/write scopes.",
    ],
    recommendedTests: [
      "Send payload `' OR '1'='1` to `order_id` and assert 400 Bad Request or empty safe result.",
      "Verify SQLAlchemy/DB driver receives bound parameters rather than concatenated SQL.",
    ],
    detectedAt: "2026-11-22",
  },
  {
    id: "SEC-102",
    analysisId: "ANL-2026-084",
    projectId: "proj-finvault",
    projectName: "FinVault Payment Gateway",
    title: "Hardcoded JWT Signing Secret",
    category: "Hardcoded Credentials",
    cwe: "CWE-798",
    file: "src/infra/jwt_provider.py",
    line: 8,
    severity: "Critical",
    status: "In Progress",
    explanation:
      "A static fallback secret string is committed directly in source code for signing authentication tokens.",
    impact:
      "Anyone with repository access can forge valid administrative JWT tokens and impersonate arbitrary accounts.",
    vulnerableCode: `SECRET_KEY = os.getenv("JWT_SECRET", "finvault_dev_secret_2025")

def issue_access_token(user_id: str) -> str:
    return jwt.encode({"sub": user_id}, SECRET_KEY, algorithm="HS256")`,
    secureCode: `SECRET_KEY = os.environ["JWT_SECRET"]  # Fail fast if secret is missing

def issue_access_token(user_id: str) -> str:
    return jwt.encode({"sub": user_id}, SECRET_KEY, algorithm="HS256")`,
    remediationSteps: [
      "Remove the hardcoded default secret from `jwt_provider.py`.",
      "Require `JWT_SECRET` from a secrets manager or environment variable at startup.",
      "Rotate all existing signing keys and invalidate active sessions.",
    ],
    recommendedTests: [
      "Boot application without `JWT_SECRET` set and verify startup fails cleanly.",
      "Verify tokens signed with old hardcoded secret are rejected with 401 Unauthorized.",
    ],
    detectedAt: "2026-11-22",
  },
  {
    id: "SEC-103",
    analysisId: "ANL-2026-084",
    projectId: "proj-finvault",
    projectName: "FinVault Payment Gateway",
    title: "Insecure Pickle Deserialization on Webhook Cache",
    category: "Insecure Deserialization",
    cwe: "CWE-502",
    file: "src/infra/webhook_cache.py",
    line: 29,
    severity: "High",
    status: "Open",
    explanation:
      "Cached webhook payloads are deserialized using `pickle.loads()` on data retrieved from an external Redis instance.",
    impact:
      "If Redis is compromised or cache poisoning occurs, `pickle.loads()` can lead to arbitrary remote code execution.",
    vulnerableCode: `def get_cached_event(redis_client, event_key: str):
    raw = redis_client.get(event_key)
    return pickle.loads(raw) if raw else None`,
    secureCode: `def get_cached_event(redis_client, event_key: str):
    raw = redis_client.get(event_key)
    return json.loads(raw.decode("utf-8")) if raw else None`,
    remediationSteps: [
      "Replace `pickle` serialization with JSON (`json.loads` / `json.dumps`).",
      "Validate deserialized payloads against a strict Pydantic schema.",
    ],
    recommendedTests: [
      "Pass malformed or non-JSON bytes in cache and verify safe exception handling.",
    ],
    detectedAt: "2026-11-22",
  },
  {
    id: "SEC-104",
    analysisId: "ANL-2026-081",
    projectId: "proj-medipulse",
    projectName: "MediPulse Patient Portal",
    title: "Reflected Cross-Site Scripting (XSS) in Patient Notes",
    category: "Cross-Site Scripting",
    cwe: "CWE-79",
    file: "src/views/NotePreview.tsx",
    line: 54,
    severity: "High",
    status: "Open",
    explanation:
      "Clinical note HTML is injected directly into the DOM using `dangerouslySetInnerHTML` without sanitization.",
    impact:
      "Malicious scripts embedded in patient or clinician notes can execute in the browser session and exfiltrate session tokens or PHI.",
    vulnerableCode: `export function NotePreview({ htmlContent }: { htmlContent: string }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}`,
    secureCode: `import DOMPurify from "dompurify";

export function NotePreview({ htmlContent }: { htmlContent: string }) {
  const clean = DOMPurify.sanitize(htmlContent);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}`,
    remediationSteps: [
      "Sanitize all HTML content with DOMPurify before rendering.",
      "Prefer plain-text or structured Markdown rendering where rich HTML is unnecessary.",
      "Enforce a strict Content-Security-Policy (CSP) header.",
    ],
    recommendedTests: [
      "Render `<img src=x onerror=alert(1)>` in NotePreview and verify script attributes are stripped.",
    ],
    detectedAt: "2026-11-21",
  },
  {
    id: "SEC-105",
    analysisId: "ANL-2026-079",
    projectId: "proj-cloudcart",
    projectName: "CloudCart Commerce Core",
    title: "Path Traversal in Invoice Download Endpoint",
    category: "Path Traversal",
    cwe: "CWE-22",
    file: "src/main/java/com/cloudcart/controller/InvoiceController.java",
    line: 67,
    severity: "High",
    status: "Open",
    explanation:
      "The `filename` query parameter is concatenated directly to the invoice base directory without canonical path verification.",
    impact:
      "Attackers can use `../../` sequences to download arbitrary configuration files or credentials from the host filesystem.",
    vulnerableCode: `Path filePath = Paths.get("/var/data/invoices/" + filename);
return Files.readAllBytes(filePath);`,
    secureCode: `Path baseDir = Paths.get("/var/data/invoices").toAbsolutePath().normalize();
Path resolved = baseDir.resolve(filename).normalize();
if (!resolved.startsWith(baseDir)) {
    throw new SecurityException("Invalid invoice path");
}
return Files.readAllBytes(resolved);`,
    remediationSteps: [
      "Normalize the resolved path and assert it starts with the canonical base directory.",
      "Allow only alphanumeric invoice IDs mapped server-side to filenames.",
    ],
    recommendedTests: [
      "Request `?filename=../../etc/passwd` and assert HTTP 400 or 403 response.",
    ],
    detectedAt: "2026-11-19",
  },
  {
    id: "SEC-106",
    analysisId: "ANL-2026-075",
    projectId: "proj-sentinelauth",
    projectName: "SentinelAuth Identity Hub",
    title: "Missing Rate Limit on Password Reset Endpoint",
    category: "Insecure Authentication",
    cwe: "CWE-307",
    file: "src/Controllers/AuthController.cs",
    line: 112,
    severity: "Medium",
    status: "Fixed",
    explanation:
      "The password reset endpoint does not enforce per-IP or per-account throttling.",
    impact:
      "Allows automated enumeration of registered emails and potential SMS/email flooding.",
    vulnerableCode: `[HttpPost("reset-password")]
public async Task<IActionResult> ResetPassword(ResetDto dto) { ... }`,
    secureCode: `[EnableRateLimiting("AuthStrictPolicy")]
[HttpPost("reset-password")]
public async Task<IActionResult> ResetPassword(ResetDto dto) { ... }`,
    remediationSteps: [
      "Apply a strict sliding-window rate limiter to all authentication and recovery endpoints.",
    ],
    recommendedTests: [
      "Send 15 consecutive requests within 10 seconds and assert HTTP 429 Too Many Requests.",
    ],
    detectedAt: "2026-11-18",
  },
  {
    id: "SEC-107",
    analysisId: "ANL-2026-084",
    projectId: "proj-finvault",
    projectName: "FinVault Payment Gateway",
    title: "Verbose Stack Trace Exposed in Error Handler",
    category: "Information Exposure",
    cwe: "CWE-209",
    file: "src/api/error_handler.py",
    line: 19,
    severity: "Low",
    status: "Accepted Risk",
    explanation:
      "Unhandled exceptions return internal traceback strings in JSON responses when `DEBUG` flag is misconfigured.",
    impact:
      "Exposes internal file paths, dependency versions, and query structures to external callers.",
    vulnerableCode: `return JSONResponse(status_code=500, content={"error": traceback.format_exc()})`,
    secureCode: `logger.exception("Unhandled server error", extra={"correlation_id": req_id})
return JSONResponse(status_code=500, content={"error": "Internal server error", "request_id": req_id})`,
    remediationSteps: [
      "Log full stack traces internally with a correlation ID and return generic error messages to clients.",
    ],
    recommendedTests: [
      "Trigger a simulated 500 error and verify response body contains no file paths or stack frames.",
    ],
    detectedAt: "2026-11-22",
  },
];
