import { render, screen, fireEvent } from "@testing-library/react";
import { Blog } from "./Blog";
import { NewBlogForm } from "./NewBlogForm";
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
    const setBlogs = vi.fn();

    render(<Blog blog={blog} setBlogs={setBlogs} />);

    expect(screen.queryByText(/http:\/\/example.com/i)).toBeNull();
    expect(screen.queryByText(/Likes: 10/i)).toBeNull();

    const button = screen.getByText('Show Blog');
    fireEvent.click(button);

    expect(screen.getByText(/http:\/\/example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Likes: 10/i)).toBeInTheDocument();
});


test("calls submitNewBlog with the right details when a new blog is created", () => {
    const mockSubmitNewBlog = vi.fn(); 
    const mockHandleChangeTitle = vi.fn(); 
    const mockHandleChangeURL = vi.fn(); 
    const mockSetIsCreateFormShowing = vi.fn();

    const title = "Initial Title"; 
    const url = "http://initial-url.com"; 


    render(
        <NewBlogForm
            isCreateFormShowing={true}
            submitNewBlog={mockSubmitNewBlog}
            title={title}
            handleChangeTitle={mockHandleChangeTitle}
            url={url}
            handleChangeURL={mockHandleChangeURL}
            setIsCreateFormShowing={mockSetIsCreateFormShowing}
        />
    );

    const titleInput = screen.getByPlaceholderText("Title");
    const urlInput = screen.getByPlaceholderText("URL");

    fireEvent.change(titleInput, { target: { value: "New Blog Title" } });
    fireEvent.change(urlInput, { target: { value: "http://newblog.com" } });

    const form = screen.getByTestId("new-blog-form");
    fireEvent.submit(form);

    expect(mockSubmitNewBlog).toHaveBeenCalledTimes(1);
});
