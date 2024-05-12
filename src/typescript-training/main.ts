const textInputElement = document.getElementById(
  "text-input"
) as HTMLInputElement;
const submitButtonElement = document.getElementById(
  "submit-button"
) as HTMLButtonElement;
textInputElement?.addEventListener("input", (event) => {
  const inputValue = (event.target as HTMLInputElement).value;
  submitButtonElement.disabled = inputValue.length === 0;
});
