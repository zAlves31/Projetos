export const TitleSuggested = ({children, isGradient=true}) => {

    return (
        <div
            className={`text-wrap indent-2.5 ${isGradient ? 'bg-techGradient' : 'bg-primary-blue'} rounded py-1 mx-auto w-[95%] text-secondary-white font-chackra text-lg`}
        >
            {children}
        </div>
    );
    
}