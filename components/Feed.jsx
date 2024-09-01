"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="prompt_layout mt-16">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          prompt={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [searchedResult, setSearchedResult] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const fetchPrompts = async () => {
    const res = await fetch("/api/prompt");
    const data = await res.json();
    setAllPosts(data);
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(searchText);
        setSearchedResult(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    searchText(tagName);
    const searchResult = filterPrompts(tagName);
    setSearchedResult(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex justify-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList data={searchedResult} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
