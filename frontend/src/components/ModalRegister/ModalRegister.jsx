import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Backdrop, ModalWindow, Title, FormGroup, Label, Input, RadioGroup, RadioLabel, RadioInput, ButtonGroup, Button, EventTitle } from "./ModalRegister.styled";
import { validationSchema } from "../../shared/models/schemas";
import { registerParticipant } from "../../shared/api/events";

const modalRoot = document.querySelector("#modal-root");

export const ModalRegister = ({ event, onClose }) => {
  useEffect(() => {
    const close = e => {
      if (e.keyCode === 27) {
        onClose({});
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose({});
    }
  };

  const handleSubmit = async values => {
    console.log("form values= ", values);
    console.log("id= ", event.id);
    const result = await registerParticipant(values, event.id);
    console.log("result= ", result);
  };

  return createPortal(
    <Backdrop onClick={handleBackdropClick}>
      <ModalWindow>
        <Title>Registration on</Title>
        <EventTitle>{event.title}</EventTitle>
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            dateOfBirth: "",
            heardFrom: "",
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            // console.log("form values= ", values);
            handleSubmit(values);
            onClose({});
          }}>
          {() => (
            <Form>
              <FormGroup>
                <Label htmlFor="fullName">Full name</Label>
                <Field name="fullName" as={Input} />
                <ErrorMessage name="fullName" component="div" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Field name="email" as={Input} type="email" />
                <ErrorMessage name="email" component="div" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="dateOfBirth">Date of birth</Label>
                <Field name="dateOfBirth" as={Input} type="date" />
                <ErrorMessage name="dateOfBirth" component="div" />
              </FormGroup>
              <FormGroup>
                <Label>Where did you hear about this event?</Label>
                <RadioGroup>
                  <RadioLabel>
                    <Field name="heardFrom" as={RadioInput} type="radio" value="Social media" />
                    Social media
                  </RadioLabel>
                  <RadioLabel>
                    <Field name="heardFrom" as={RadioInput} type="radio" value="Friends" />
                    Friends
                  </RadioLabel>
                  <RadioLabel>
                    <Field name="heardFrom" as={RadioInput} type="radio" value="Found myself" />
                    Found myself
                  </RadioLabel>
                </RadioGroup>
                <ErrorMessage name="heardFrom" component="div" />
              </FormGroup>
              <ButtonGroup>
                <Button type="button" onClick={()=>onClose({})}>
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
      </ModalWindow>
    </Backdrop>,
    modalRoot
  );
};
