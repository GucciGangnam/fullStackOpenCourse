import { render, screen, fireEvent } from "@testing-library/react";
import { Blog } from "./Blog";
import { test, expect, vi } from "vitest";

test('renders blog title and author but not URL or likes by default', () => {
    const blog = {
        title: 'Test Blog Title',
        author: 'Test Author',
        url: 'http://example.com',
        likes: 10,
        id: '123'
    };
    const setBlogs = vi.fn();

    render(<Blog blog={blog} setBlogs={setBlogs} />);

    expect(screen.getByText('Name: Test Blog Title')).toBeInTheDocument();
    expect(screen.getByText('Show Blog')).toBeInTheDocument();

    expect(screen.queryByText('http://example.com')).toBeNull();
    expect(screen.queryByText('Likes: 10')).toBeNull();
});

test("shows URL and likes when 'Show Blog' button is clicked", () => {
    const blog = {
        title: "Test Blog Title",
        author: "Test Author",
        url: "http://example.com",
        likes: 10,
        id: "123",
    };
    const setBlogs = vi.fn(); // Mock the setBlogs function

    render(<Blog blog={blog} setBlogs={setBlogs} />);

    // Initially, URL and likes should not be rendered
    expect(screen.queryByText(/http:\/\/example.com/i)).toBeNull();
    expect(screen.queryByText(/Likes: 10/i)).toBeNull();

    // Find and click the 'Show Blog' button
    const button = screen.getByText('Show Blog');
    fireEvent.click(button);

    // Now the URL and likes should be rendered
    expect(screen.getByText(/http:\/\/example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Likes: 10/i)).toBeInTheDocument();
});