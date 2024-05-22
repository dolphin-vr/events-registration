import { BtnReset, BtnSort, FilterContainer, FilterGroup, FilterInput, FilterLabel,  } from "./Filter.styled";

export const Filter = ({ filters, sortOrder, changeFilters, changeSort }) => {

  const handleFilterChange = e => {
    const { name, value } = e.target;
    changeFilters({ ...filters, [name]: value });
  };

  const handleResetFilters = () => {
    changeFilters({ title: "", eventDate: "", organizer: "" });
  };

  return (
    <FilterContainer>
      <FilterGroup>
        <FilterLabel htmlFor="title">Title:</FilterLabel>
        <FilterInput id="title" name="title" value={filters.title} onChange={handleFilterChange} />
        <BtnSort onClick={() => changeSort("title")}>Sort {sortOrder.title === "asc" ? "Asc" : "Des"}</BtnSort>
      </FilterGroup>
      <FilterGroup>
        <FilterLabel htmlFor="eventDate">Date:</FilterLabel>
        <FilterInput id="eventDate" name="eventDate" value={filters.eventDate} onChange={handleFilterChange} />
        <BtnSort onClick={() => changeSort("eventDate")}>Sort {sortOrder.eventDate === "asc" ? "Asc" : "Des"}</BtnSort>
      </FilterGroup>
      <FilterGroup>
        <FilterLabel htmlFor="organizer">Organizer:</FilterLabel>
        <FilterInput id="organizer" name="organizer" value={filters.organizer} onChange={handleFilterChange} />
        <BtnSort onClick={() => changeSort("organizer")}>Sort {sortOrder.organizer === "asc" ? "Asc" : "Des"}</BtnSort>
      </FilterGroup>
      <BtnReset onClick={handleResetFilters}>Reset Filters</BtnReset>
    </FilterContainer>
  );
};
