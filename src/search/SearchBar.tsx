import React, { useState, useRef } from "react";


interface SearchBarProps {
    onSearchResult: (enteredTitle: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {

    const titleInputRef = useRef<HTMLInputElement>(null);
    const dateInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const enteredTitle = titleInputRef.current.value;
        props.onSearchResult(enteredTitle);
    }
    
    return (
      <form className='form' onSubmit={submitHandler}>
        <div>
          <input type='text' placeholder='Your Streaming BackLog Begins Here... ' ref={titleInputRef} className='searchBar'/>
          <button type='submit'> Search </button>
        </div>
    </form>
    )
}

export default SearchBar;