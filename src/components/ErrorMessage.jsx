const ErrorMessage = (props) => {
    return (
        <div className="p-4 my-5 w-full bg-red-200">
            <p>{props.children}</p>
        </div>
    )
}

export default ErrorMessage;