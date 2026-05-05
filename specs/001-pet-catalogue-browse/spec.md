# Feature Specification: Browse Pet Catalogue with Category Filtering

### User Story 1 - Browse All Pets (Priority: P1)

A visitor arrives at the Petstore and wants to explore what pets are available. They can see a catalogue of all pets across all categories, displayed as a grid of cards. Each card shows the pet's photo, name, breed/species, category, and price. The visitor can scroll through the full catalogue without needing to log in.

Independent Test: Open the homepage — all pets load in a grid. Verify pets from all four categories (Dogs, Cats, Birds, Fish) are visible.

Acceptance Scenarios:
- Given the visitor opens the Petstore homepage, When the catalogue loads, Then a grid of pet cards is displayed, each showing photo, name, category, and price.
- Given the catalogue is loaded, When there are no pets in the database, Then an empty-state message ("No pets available at the moment") is displayed.

### User Story 2 - Filter by Category (Priority: P2)

A visitor selects one or more category filters (Dogs, Cats, Birds, Fish) and the catalogue updates to show only matching pets. Filter state persists in the URL.

### User Story 3 - View Pet Detail (Priority: P3)

Clicking a pet card opens a detail page with description, photos, age, availability and an "Add to Cart" button.

## Requirements
- FR-001: The system MUST display all available pets in a browsable grid or list view.
- FR-002: The system MUST support filtering pets by category: Dogs, Cats, Birds, Fish.
- FR-005: The system MUST persist active filter selections in the page URL.

## Success Criteria
- SC-001: Visitors can find pets of a desired category within 2 interactions from the homepage.

Feature Branch: `001-pet-catalogue-browse`
