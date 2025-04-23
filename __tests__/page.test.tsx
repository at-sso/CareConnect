/**
 * Landing Page Tests
 *
 * This file contains tests for the landing page component.
 * It tests the rendering of various sections and elements.
 */
import type React from "react";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

// Mock the next/link component to avoid navigation in tests
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock the lucide-react icons to simplify testing
jest.mock("lucide-react", () => ({
  Shield: () => <div data-testid="shield-icon" />,
  Clock: () => <div data-testid="clock-icon" />,
  Users: () => <div data-testid="users-icon" />,
  FileText: () => <div data-testid="file-text-icon" />,
  CreditCard: () => <div data-testid="credit-card-icon" />,
  Calendar: () => <div data-testid="calendar-icon" />,
}));

describe("Home Page", () => {
  /**
   * Test that the logo and navigation links render correctly
   */
  it("renders the logo and navigation links", () => {
    render(<Home />);

    // Check if the logo is rendered
    expect(screen.getByText("CareConnect")).toBeDefined();

    // Check if navigation links are rendered
    expect(screen.getByText("Inicio")).toBeDefined();
    expect(screen.getByText("Servicios")).toBeDefined();
    expect(screen.getByText("Contacto")).toBeDefined();
  });

  /**
   * Test that the hero section renders with call-to-action buttons
   */
  it("renders the hero section with call-to-action buttons", () => {
    render(<Home />);

    // Check if the hero title and description are rendered
    expect(screen.getByText("Cuidado de salud simplificado")).toBeDefined();
    expect(screen.getByText(/Gestione sus citas médicas/)).toBeDefined();

    // Check if CTA buttons are rendered
    expect(screen.getByText("Comenzar ahora")).toBeDefined();
    expect(screen.getByText("Conocer más")).toBeDefined();
  });

  /**
   * Test that the services section renders with three services
   */
  it("renders the services section with three services", () => {
    render(<Home />);

    // Check if the section title is rendered
    expect(screen.getByText("Nuestros Servicios")).toBeDefined();

    // Check if the three services are rendered
    expect(screen.getByText("Gestión de Citas")).toBeDefined();
    expect(screen.getByText("Documentos Médicos")).toBeDefined();
    expect(screen.getByText("Pagos y Facturación")).toBeDefined();

    // Check if the icons are rendered
    expect(screen.getByTestId("calendar-icon")).toBeDefined();
    expect(screen.getByTestId("file-text-icon")).toBeDefined();
    expect(screen.getByTestId("credit-card-icon")).toBeDefined();
  });

  /**
   * Test that the benefits section renders with four benefits
   */
  it("renders the benefits section with four benefits", () => {
    render(<Home />);

    // Check if the section title is rendered
    expect(screen.getByText("¿Por qué elegirnos?")).toBeDefined();

    // Check if the four benefits are rendered
    expect(screen.getByText("Seguridad Garantizada")).toBeDefined();
    expect(screen.getByText("Disponible 24/7")).toBeDefined();
    expect(screen.getByText("Atención Personalizada")).toBeDefined();
    expect(screen.getByText("Historial Completo")).toBeDefined();
  });

  /**
   * Test that the contact form renders with all fields
   */
  it("renders the contact form with all fields", () => {
    render(<Home />);

    // Check if the section title is rendered
    expect(screen.getByText("Contáctenos")).toBeDefined();

    // Check if the form fields are rendered
    expect(screen.getByLabelText("Nombre")).toBeDefined();
    expect(screen.getByLabelText("Email")).toBeDefined();
    expect(screen.getByLabelText("Asunto")).toBeDefined();
    expect(screen.getByLabelText("Mensaje")).toBeDefined();

    // Check if the submit button is rendered
    expect(screen.getByText("Enviar Mensaje")).toBeDefined();
  });

  /**
   * Test that the footer renders with copyright information
   */
  it("renders the footer with copyright information", () => {
    render(<Home />);

    // Check if the copyright information is rendered
    expect(screen.getByText(/© 2025 CareConnect/)).toBeDefined();
  });
});
