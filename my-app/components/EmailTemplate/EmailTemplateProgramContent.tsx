import React from "react";
import {
  Heading,
  Html,
  Text,
  Hr,
  Container,
  Body,
  Section,
  Img,
  Button,
} from "@react-email/components";

interface Program {
  title: string;
  url: string;
}

interface EmailTemplateProgramContentProps {
  programs: Program[];
}

export default function EmailTemplateProgramContent({
  programs,
}: EmailTemplateProgramContentProps) {
  return (
    <Html>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={{ textAlign: "center", marginBottom: 24 }}>
            <Img
              src="https://res.cloudinary.com/dnkhbxpji/image/upload/v1738350112/Capture_d_e%CC%81cran_le_2025-01-31_a%CC%80_20.01.46_mb412b.png"
              alt="Smartinet Coaching"
              width={120}
              style={{ margin: "0 auto" }}
            />
          </Section>
          <Heading style={heading}>🪄 Bienvenue dans la team Smartinet !</Heading>
          <Text style={intro}>
            Félicitations, votre achat a bien été pris en compte. Retrouvez ci-dessous vos programmes :
          </Text>
          <Section style={programsSection}>
            {programs.map((program, index) => (
              <Container key={index} style={programCard}>
                <Text style={programTitle}>{program.title}</Text>
                <Button
                  href={program.url}
                  style={button}
                >
                  Télécharger mon programme
                </Button>
              </Container>
            ))}
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            Merci pour votre confiance.<br />
            Toute l’équipe Smartinet Coaching
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "32px 24px 48px",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  maxWidth: "480px",
};

const heading = {
  fontSize: "26px",
  fontWeight: "bold",
  margin: "24px 0 12px 0",
  color: "#22223b",
  textAlign: "center" as const,
};

const intro = {
  fontSize: "16px",
  color: "#4a4e69",
  marginBottom: "24px",
  textAlign: "center" as const,
};

const programsSection = {
  margin: "24px 0",
};

const programCard = {
  backgroundColor: "#f1f1f1",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "16px",
  textAlign: "center" as const,
};

const programTitle = {
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "12px",
  color: "#22223b",
};

const button = {
  backgroundColor: "#FF6363",
  color: "#fff",
  padding: "12px 24px",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "16px",
  border: "none",
  cursor: "pointer",
};

const hr = {
  borderColor: "#dddddd",
  margin: "32px 0 16px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "13px",
  textAlign: "center" as const,
};
