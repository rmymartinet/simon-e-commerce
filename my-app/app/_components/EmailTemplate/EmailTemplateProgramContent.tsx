import React from "react";
import {
  Heading,
  Html,
  Text,
  Link,
  Hr,
  Container,
  Body,
  Section,
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
  console.log("coté SERVEUR :", programs);
  return (
    <Html>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>🪄 Bienvenue dans la team !</Heading>
          <Section style={body}>
            <ul>
              {programs.map((program, index) => (
                <li key={index}>
                  <Text style={paragraph} className="text-lg">
                    Voivi votre programme {program.title}
                  </Text>
                  <Text style={paragraph} className="text-lg">
                    <Link
                      style={link}
                      className="text-[#FF6363]"
                      href={program.url}
                    >
                      👉 Mon programme 👈
                    </Link>
                  </Text>
                </li>
              ))}
            </ul>
          </Section>
          <Hr style={hr} className="mt-[48px] border-[#dddddd]" />
          <Text style={footer} className="ml-1 text-xs text-[#8898aa]">
            2025 Sm-Coaching, France
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
  backgroundImage: 'url("/static/raycast-bg.png")',
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat, no-repeat",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
};

const body = {
  margin: "24px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const link = {
  color: "#FF6363",
};

const hr = {
  borderColor: "#dddddd",
  marginTop: "48px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  marginLeft: "4px",
};
