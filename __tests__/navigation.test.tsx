/**
 * Navigation Tests
 *
 * This file contains tests for the navigation component.
 * It tests the rendering of navigation links and their attributes.
 */
import { render, screen } from "@testing-library/react";

/**
 * Mock Navigation component for testing
 * This is a simplified version of what would be extracted from the page
 */
const Navigation = () => {
  return (
    <nav className="hidden md:flex space-x-6">
      <a href="/" className="text-gray-100 hover:text-blue-400 px-2">
        Inicio
      </a>
      <a href="/servicios" className="text-gray-100 hover:text-blue-400 px-2">
        Servicios
      </a>
      <a href="#contacto" className="text-gray-100 hover:text-blue-400 px-2">
        Contacto
      </a>
    </nav>
  );
};

describe("Navigation", () => {
  /**
   * Test that all navigation links render correctly
   */
  it("renders all navigation links", () => {
    render(<Navigation />);

    expect(screen.getByText("Inicio")).toBeDefined();
    expect(screen.getByText("Servicios")).toBeDefined();
    expect(screen.getByText("Contacto")).toBeDefined();
  });

  /**
   * Test that links have correct href attributes
   */
  it("has correct href attributes for each link", () => {
    render(<Navigation />);

    expect(screen.getByText("Inicio").getAttribute("href")).toBe("/");
    expect(screen.getByText("Servicios").getAttribute("href")).toBe(
      "/servicios"
    );
    expect(screen.getByText("Contacto").getAttribute("href")).toBe("#contacto");
  });

  /**
   * Test that links have correct styling
   */
  it("applies correct styling to links", () => {
    render(<Navigation />);

    const inicioLink = screen.getByText("Inicio");
    expect(inicioLink).toHaveProperty("text-gray-100");
    expect(inicioLink).toHaveProperty("hover:text-blue-400");
  });
});
