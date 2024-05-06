import { useState } from "react";
import { Input, InputAdornment } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { GET_CHARACTERS_BY_NAME } from "../../queries/characters.query";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router";

export const Search = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [getCharactersByName, { loading, error, data }] = useLazyQuery(
    GET_CHARACTERS_BY_NAME
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getCharactersByName({ variables: { name: search } });
    navigate("/search/" + search);
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      style={{
        width: "100%",
        padding: "5rem",
        paddingBottom: 0,
      }}
    >
      <Input
        id="standard-basic"
        onChange={handleChange}
        fullWidth
        placeholder="Search for a character with their name"
        autoFocus
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />{" "}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data?.characters.results.length === 0 && (
        <p>No results found for "{search}"</p>
      )}
    </form>
  );
};
