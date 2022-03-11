const Container = (props) => {
    if (props.prose) {
        return (
            <div className="px-5 py-10">
                <article className="max-w-screen-prose mx-auto prose prose-slate prose-sm sm:prose-base mb-10">
                    <div className="max-w-screen-lg mx-auto flex flex-col">
                        {props.children}
                    </div>
                </article>
            </div>
        );
    } else {
        return (
            <div className="px-5 py-10">
                <div className="max-w-screen-lg mx-auto flex flex-col">
                    {props.children}
                </div>
            </div>
        );
    }
};

export default Container;
