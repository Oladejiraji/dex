import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { ChainPopover } from ".";
import { initialChain } from "@/utils/static";
import "@testing-library/jest-dom/vitest";
import { Tokens } from "@/mocks/mockData";
import { delay } from "@/services/helper";

const MockChainPopover = ({ isPopOpen }: { isPopOpen: boolean }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ChainPopover
        isPopOpen={isPopOpen}
        setIsPopOpen={vi.fn()}
        handleChainUpdate={vi.fn()}
        currChain={initialChain}
      />
    </QueryClientProvider>
  );
};

describe("Test suite for the chain popover component", () => {
  it("Test that the component renders when isPopOpen is true", async () => {
    render(<MockChainPopover isPopOpen={true} />);
    expect(screen.getByPlaceholderText("Search Token...")).toBeInTheDocument();
  });

  it("Test that the component does not render when isPopOpen is false", async () => {
    render(<MockChainPopover isPopOpen={false} />);
    expect(
      screen.queryByPlaceholderText("Search Token...")
    ).not.toBeInTheDocument();
  });

  it("Test that the rendered data in the full list is all the data gotten from the api when the search value is an empty string", async () => {
    render(<MockChainPopover isPopOpen={true} />);
    const fullScreenButtons = await screen.findAllByTestId(
      "data-full-list-button"
    );
    expect(fullScreenButtons).toHaveLength(Tokens.length);
  });

  it("Test that the search value updates when input is clicked", async () => {
    render(<MockChainPopover isPopOpen={true} />);
    const input = screen.getByPlaceholderText("Search Token...");
    fireEvent.change(input, { target: { value: "SOL" } });
    expect(input).toHaveValue("SOL");
  });

  it("Test that the data is filtered based on the symbol properly when the search value changes", async () => {
    render(<MockChainPopover isPopOpen={true} />);
    // First check if the data has loaded
    const fullScreenButtons = await screen.findAllByTestId(
      "data-full-list-button"
    );
    expect(fullScreenButtons).toHaveLength(13);

    // Then perform change when search value changes
    const input = screen.getByPlaceholderText("Search Token...");

    fireEvent.change(input, { target: { value: "Civic" } });

    // This is to mimic debouncing of the search value of 1000ms
    await delay(500);

    const fullScreenButtons1 = screen.getAllByTestId("data-full-list-button");
    expect(fullScreenButtons1).toHaveLength(1);

    expect(await screen.findByText("Civic"));
  });
  it("Test that the data is filtered properly based on the symbol when the search value changes regardless of the case", async () => {
    render(<MockChainPopover isPopOpen={true} />);
    // First check if the data has loaded
    const fullScreenButtons = await screen.findAllByTestId(
      "data-full-list-button"
    );
    expect(fullScreenButtons).toHaveLength(13);

    // Then perform change when search value changes
    const input = screen.getByPlaceholderText("Search Token...");

    fireEvent.change(input, { target: { value: "civic" } });

    // This is to mimic debouncing of the search value of 1000ms
    await delay(500);

    const fullScreenButtons1 = screen.getAllByTestId("data-full-list-button");
    expect(fullScreenButtons1).toHaveLength(1);

    expect(await screen.findByText("Civic"));
  });
  it("Test that the data is filtered properly based on the symbol when the search value changes regardless of the case", async () => {
    render(<MockChainPopover isPopOpen={true} />);
    // First check if the data has loaded
    const fullScreenButtons = await screen.findAllByTestId(
      "data-full-list-button"
    );
    expect(fullScreenButtons).toHaveLength(13);

    // Then perform change when search value changes
    const input = screen.getByPlaceholderText("Search Token...");

    fireEvent.change(input, { target: { value: "coinbase" } });

    // This is to mimic debouncing of the search value of 1000ms
    await delay(500);

    const fullScreenButtons1 = screen.getAllByTestId("data-full-list-button");
    expect(fullScreenButtons1).toHaveLength(1);

    expect(await screen.findByText("CBBTC"));
  });
});
