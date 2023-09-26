import { StyledButton } from "./Button.styled";

export const Button = ({ onClick, value }) => {
    return (
        <StyledButton onClick={onClick}>{value}</StyledButton>
    );
};