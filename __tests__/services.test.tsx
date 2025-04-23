/**
 * Services Section Tests
 *
 * This file contains tests for the services section component.
 * It tests the rendering of services, their titles, descriptions, and icons.
 */
import { render, screen } from "@testing-library/react";
import ServicesSection from "@/components/services-section";

// Mock the lucide-react icons to simplify testing
jest.mock("lucide-react", () => ({
  Calendar: () => <div data-testid="calendar-icon" />,
  FileText: () => <div data-testid="file-text-icon" />,
  CreditCard: () => <div data-testid="credit-card-icon" />,
}));

describe("ServicesSection", () => {
  /**
   * Test that the section title renders correctly
   */
  it("renders the section title", () => {
    render(<ServicesSection />);

    expect(screen.getByText("Nuestros Servicios")).toBeInTheDocument();
  });

  /**
   * Test that all three services render with correct titles
   */
  it("renders all three services with correct titles", () => {
    render(<ServicesSection />);

    expect(screen.getByText("Gestión de Citas")).toBeInTheDocument();
    expect(screen.getByText("Documentos Médicos")).toBeInTheDocument();
    expect(screen.getByText("Pagos y Facturación")).toBeInTheDocument();
  });

  /**
   * Test that all service descriptions render correctly
   */
  it("renders all service descriptions", () => {
    render(<ServicesSection />);

    expect(
      screen.getByText(/Programe, reprograme o cancele sus citas médicas/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Acceda a sus recetas, resultados de laboratorio/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Revise su estado de cuenta, realice pagos/)
    ).toBeInTheDocument();
  });

  /**
   * Test that all service icons render correctly
   */
  it("renders all service icons", () => {
    render(<ServicesSection />);

    expect(screen.getAllByTestId("calendar-icon")).toHaveLength(1);
    expect(screen.getAllByTestId("file-text-icon")).toHaveLength(1);
    expect(screen.getAllByTestId("credit-card-icon")).toHaveLength(1);
  });

  /**
   * Test that "Saber más" links render for each service
   */
  it('renders "Saber más" links for each service', () => {
    render(<ServicesSection />);

    const links = screen.getAllByText("Saber más →");
    expect(links).toHaveLength(3);

    // Check that all links point to the services page
    links.forEach((link) => {
      expect(link.getAttribute("href")).toBe("/servicios");
    });
  });
});
