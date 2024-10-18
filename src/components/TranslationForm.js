import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import styled from 'styled-components';

const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  
  const openai = new OpenAIApi(configuration);

const TranslationContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: #f9f9f9;
`;

const LanguageSelect = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  select {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ddd;
    font-size: 1rem;
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  margin-bottom: 10px;
`;

const TranslateButton = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  background-color: #007aff;
  color: white;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;

const TranslationForm = () => {
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [inputLanguage, setInputLanguage] = useState('French Quebecois');
    const [outputLanguage, setOutputLanguage] = useState('English');
  
    const handleTranslate = async () => {
      try {
        const response = await openai.createCompletion({
          model: 'gpt-4',
          prompt: `Translate the following text from ${inputLanguage} to ${outputLanguage} with context: ${inputText}`,
          max_tokens: 100,
        });
        setTranslatedText(response.data.choices[0].text.trim());
      } catch (error) {
        console.error("Error translating text:", error);
        setTranslatedText("An error occurred while translating. Please try again.");
      }
    };

  return (
    <TranslationContainer>
      <LanguageSelect>
        <label>Input Language:</label>
        <select value={inputLanguage} onChange={(e) => setInputLanguage(e.target.value)}>
          <option value="French Quebecois">French Quebecois</option>
          <option value="English">English</option>
        </select>
        <label>Output Language:</label>
        <select value={outputLanguage} onChange={(e) => setOutputLanguage(e.target.value)}>
          <option value="English">English</option>
          <option value="French Quebecois">French Quebecois</option>
        </select>
      </LanguageSelect>
      <StyledTextarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to translate"
      />
      <TranslateButton onClick={handleTranslate}>Translate</TranslateButton>
      <div className="result-container">
        <h3>Translation Result:</h3>
        <p>{translatedText}</p>
      </div>
    </TranslationContainer>
  );
};

export default TranslationForm;
