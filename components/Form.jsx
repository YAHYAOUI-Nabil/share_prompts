import Link from "next/link";

const Form = ({ type, prompt, setPrompt, handleSubmit, submitting }) => {
  return (
    <section className="w-full max-w-full flex flex-col justify-start">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} prompt</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI prompt
          </span>

          <textarea
            value={prompt.text}
            onChange={(e) => setPrompt({ ...prompt, text: e.target.value })}
            placeholder="write your prompt here"
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span>
            Field of prompt {` `}{" "}
            <span>(#product, #webdevelopment, #idea, etc.)</span>
          </span>

          <input
            value={prompt.tag}
            onChange={(e) => setPrompt({ ...prompt, tag: e.target.value })}
            type="text"
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex justify-end items-center mx-3 mb-5 gap-4">
          <Link
            href="/"
            className="px-5 py-1.5 text-sm bg-white rounded-full text-gray-500"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
