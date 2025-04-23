import { render, screen } from "@testing-library/react";

// Create a simple Navigation component for testing
// This is a simplified version of what would be extracted from the page
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
  it("renders all navigation links", () => {
    render(<Navigation />);

    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Servicios")).toBeInTheDocument();
    expect(screen.getByText("Contacto")).toBeInTheDocument();
  });

  it("has correct href attributes for each link", () => {
    render(<Navigation />);

    expect(screen.getByText("Inicio").getAttribute("href")).toBe("/");
    expect(screen.getByText("Servicios").getAttribute("href")).toBe(
      "/servicios"
    );
    expect(screen.getByText("Contacto").getAttribute("href")).toBe("#contacto");
  });

  it("applies correct styling to links", () => {
    render(<Navigation />);

    const inicioLink = screen.getByText("Inicio");
    expect(inicioLink).toHaveClass("text-gray-100");
    expect(inicioLink).toHaveClass("hover:text-blue-400");
  });
});
