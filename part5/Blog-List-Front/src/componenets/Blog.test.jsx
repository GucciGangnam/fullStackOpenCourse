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
