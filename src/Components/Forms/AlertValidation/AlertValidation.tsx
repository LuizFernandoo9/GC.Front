import styled from "@emotion/styled";

export const FeedbackStyle = styled.a`
    width: 100%;
    margin-top: 0.25rem;
    font-size: 70%;
`

interface IAlertValidationType {
  text?: string;
}


const AlertValidation = ({ text }: IAlertValidationType) => {
  return (
    <>
      <FeedbackStyle>
        {text}
      </FeedbackStyle>
    </>
  );
};

export default AlertValidation;

