# Data Model: Browse Pet Catalogue with Category Filtering

## Entities

### Pet
Represents a single pet available in the store catalogue.

Fields:
- `id` UUID PK NOT NULL
- `name` VARCHAR(100) NOT NULL
- `category` VARCHAR(10) NOT NULL CHECK IN ('DOG','CAT','BIRD','FISH')
- `breed` VARCHAR(100) NOT NULL
- `age_months` INTEGER NOT NULL >= 0
- `description` TEXT NOT NULL
- `price` NUMERIC(10,2) NULL
- `available` BOOLEAN NOT NULL DEFAULT TRUE
- `created_at` TIMESTAMPTZ NOT NULL DEFAULT NOW()

### PetPhoto
Fields: `id` UUID, `pet_id` FK -> pets(id), `url` VARCHAR(500), `is_primary` BOOLEAN, `sort_order` INTEGER

## DTOs
- `PetSummaryDto` (id, name, category, breed, ageMonths, price, available, primaryPhotoUrl)
- `PetDetailDto` (all summary fields + description + photos)

## Migrations
Two example Flyway scripts are recommended:
- `V1__create_pets_schema.sql` (creates `pets` and `pet_photos` tables)
- `V2__seed_pets.sql` (inserts sample data covering categories)
