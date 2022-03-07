const Container = (props) => {
    return (
        <div className="px-5 py-10">
            <div className="max-w-screen-lg mx-auto flex flex-col">
                {props.children}
            </div>
        </div>
    );
};

export default Container;
