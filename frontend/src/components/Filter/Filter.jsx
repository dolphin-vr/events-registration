import { isSortAsc } from "../../shared/utils";
import { BtnReset, BtnSort, FilterContainer, FilterGroup, FilterInput, FilterLabel,  } from "./Filter.styled";

export const Filter = ({ filters, sortOrder, changeFilters, changeSort, onReset }) => {

  const orderTitle = isSortAsc(sortOrder, 'title');
  const orderDate = isSortAsc(sortOrder, "eventDate");
  const orderOrganizer = isSortAsc(sortOrder, "organizer");

  return (
    <FilterContainer>
      <FilterGroup>
        <FilterLabel htmlFor="title">Title:</FilterLabel>
        <FilterInput id="title" name="title" value={filters.title} onChange={e => changeFilters(e)} />
        <BtnSort onClick={() => changeSort("title")}>Sort {orderTitle ? "Desc" : "Asc"}</BtnSort>
      </FilterGroup>
      <FilterGroup>
        <FilterLabel htmlFor="eventDate">Date:</FilterLabel>
        <FilterInput id="eventDate" name="eventDate" type="date" value={filters.eventDate} onChange={changeFilters} />
        <BtnSort onClick={() => changeSort("eventDate")}>Sort {orderDate ? "Desc" : "Asc"}</BtnSort>
      </FilterGroup>
      <FilterGroup>
        <FilterLabel htmlFor="organizer">Organizer:</FilterLabel>
        <FilterInput id="organizer" name="organizer" value={filters.organizer} onChange={changeFilters} />
        <BtnSort onClick={() => changeSort("organizer")}>Sort {orderOrganizer ? "Desc" : "Asc"}</BtnSort>
      </FilterGroup>
      <BtnReset onClick={onReset}>Reset Filters</BtnReset>
    </FilterContainer>
  );
};
