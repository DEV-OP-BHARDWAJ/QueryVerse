import QuestionForm from "@/components/QuestionForm";
import React from "react";

const AskQuestionPage = () => {
    return (
        <div className="container mx-auto px-4 pb-20 pt-36">
            <div className="mb-10 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Ask a Public Question</h1>
            </div>
            <div className="max-w-3xl">
                {/* This is where we render the powerful, complex form component 
                  that we have already built and analyzed.
                */}
                <QuestionForm />
            </div>
        </div>
    );
};

export default AskQuestionPage;
