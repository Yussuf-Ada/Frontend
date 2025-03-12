import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "../../components/Navbar";
import { BrowserRouter } from "react-router-dom";

describe("Navbar", () => {
  test("renders navbar items correctly", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText(/workout logger/i)).toBeInTheDocument();
    expect(screen.getByText(/my workouts/i)).toBeInTheDocument();
    expect(screen.getByText(/exercise library/i)).toBeInTheDocument();
  });

  test("has correct navigation links", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const exerciseLink = screen.getByText(/exercise library/i);
    expect(exerciseLink.getAttribute("href")).toBe("/exercises");

    const workoutsLink = screen.getByText(/my workouts/i);
    expect(workoutsLink.getAttribute("href")).toBe("/workouts");
  });
});
