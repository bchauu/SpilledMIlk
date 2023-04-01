import React, { HtmlHTMLAttributes, useState, useRef } from "react";


interface SearchBarProps {
    onSearchResult: (enteredTitle: string, enteredDate: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {

    const titleInputRef = useRef<HTMLInputElement>(null);
    const dateInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const enteredTitle = titleInputRef.current.value;
        const enteredDate = dateInputRef.current.value;

        props.onSearchResult(enteredTitle, enteredDate);
        //passes input from user back to App component
    }
    
    return (
        <form placeholder="enter here" className='form' onSubmit={submitHandler}>
        <div>
          <label>Title </label>
          <input type='text' placeholder='Guardian' ref={titleInputRef}/>
        </div>
        <div>
          <label>Year </label>
          <input type='text' placeholder='2018' ref={dateInputRef}/>
        </div>
        <div>
          <button type='submit'> Search </button>
        </div>
    </form>
    )
}

export default SearchBar;