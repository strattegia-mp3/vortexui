import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// --- Validation Schema (server-side mirror of client schema) ---
// Always validate on the server regardless of client-side validation.
const LeadSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres.")
    .max(80, "Nome muito longo.")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Nome contém caracteres inválidos."),
  email: z
    .string()
    .email("E-mail inválido.")
    .max(255, "E-mail muito longo.")
    .transform((val) => val.toLowerCase().trim()),
});

// --- Types ---
export type LeadPayload = z.infer<typeof LeadSchema>;

export interface ApiSuccessResponse {
  success: true;
  message: string;
  leadId: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

// --- Utility: simulate realistic network latency ---
function simulateLatency(minMs = 800, maxMs = 1600): Promise<void> {
  const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise((resolve) => setTimeout(resolve, delay));
}

// --- Utility: generate a mock lead ID ---
function generateLeadId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `LEAD-${timestamp}-${random}`;
}

// --- Simulate saving to CRM/ESP (e.g., ActiveCampaign, RD Station) ---
// In production, replace this with your actual integration:
// - HTTP call to your ESP API (e.g., ActiveCampaign, Mailchimp, Brevo)
// - Database insert (e.g., Prisma + PostgreSQL)
// - Webhook call to your marketing automation
async function persistLead(data: LeadPayload): Promise<string> {
  await simulateLatency();

  // Simulate a ~5% server-side failure rate for realistic error handling demo
  if (Math.random() < 0.05) {
    throw new Error("Serviço de integração temporariamente indisponível.");
  }

  // In production, this would be something like:
  // const lead = await db.lead.create({ data: { name: data.name, email: data.email } });
  // await activeCampaign.contacts.create({ email: data.email, firstName: data.name });
  // return lead.id;

  return generateLeadId();
}

// --- POST /api/leads ---
export async function POST(
  request: NextRequest,
): Promise<NextResponse<ApiResponse>> {
  try {
    // Parse request body
    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Requisição inválida. Corpo JSON malformado.",
        },
        { status: 400 },
      );
    }

    // Validate with Zod
    const parseResult = LeadSchema.safeParse(rawBody);

    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;

      // Log validation error (in production, Sentry would capture this)
      console.warn("[API /leads] Validation failed:", fieldErrors);

      return NextResponse.json(
        {
          success: false,
          message: "Dados inválidos. Verifique os campos e tente novamente.",
          errors: Object.fromEntries(
            Object.entries(fieldErrors).map(([key, value]) => [
              key,
              value ?? [],
            ]),
          ),
        },
        { status: 422 },
      );
    }

    const validatedData = parseResult.data;

    // Persist the lead (mocked)
    const leadId = await persistLead(validatedData);

    // Log success (in production, also fire analytics event)
    console.info(
      `[API /leads] Lead captured: ${leadId} — ${validatedData.email}`,
    );

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Inscrição realizada com sucesso!",
        leadId,
      },
      {
        status: 201,
        headers: {
          // Prevent caching of lead submissions
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    // Log unexpected errors
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";

    console.error("[API /leads] Unexpected error:", errorMessage);

    // In production with Sentry:
    // import * as Sentry from "@sentry/nextjs";
    // Sentry.captureException(error, { extra: { endpoint: "/api/leads" } });

    return NextResponse.json(
      {
        success: false,
        message:
          "Ocorreu um erro inesperado. Tente novamente em alguns instantes.",
      },
      { status: 500 },
    );
  }
}

// --- GET /api/leads — Not allowed ---
export async function GET(): Promise<NextResponse<ApiErrorResponse>> {
  return NextResponse.json(
    { success: false, message: "Método não permitido." },
    { status: 405 },
  );
}
