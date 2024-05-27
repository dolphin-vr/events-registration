import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Formik, Form, Field } from "formik";
import { Backdrop, ModalWindow, Title, FormGroup, Label, Input, RadioLabel, RadioInput, ButtonGroup, Button, EventTitle, ErrorMsg } from "./Modals.styled";
import {DateSelector} from '../index'
import { validationSchema } from "../../shared/models/schemas";
import { registerParticipant } from "../../shared/api/events";

const modalRoot = document.querySelector("#modal-root");

export const ModalRegister = ({ event, onClose }) => {
  useEffect(() => {
    const close = e => {
      if (e.keyCode === 27) {
        onClose({}, null);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose({}, null);
    }
  };

  const handleSubmit = async values => {
    try {
      const result = await registerParticipant(values, event.id);
      if (result.status) onClose({}, result.status);
    } catch (error) {
      if (!error.response) {
        onClose({}, 500);
      } else {
        onClose({}, error.response.status);
      }
    }
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
            handleSubmit(values);
          }}>
          {() => (
            <Form>
              <Label>
                Full name
                <Field name="fullName" as={Input} type="text" />
                <ErrorMsg name="fullName" component="span" />
              </Label>
              <Label>
                Email
                <Field name="email" as={Input} type="email" />
                <ErrorMsg name="email" component="span" />
              </Label>
              <Label htmlFor="dateOfBirth">
                Date of birth
                <DateSelector name="dateOfBirth" />
                {/* <Field name="dateOfBirth" label="Date of Birth" component={DateSelector} /> */}
                {/* <Field name="dateOfBirth" as={Input} type="date" /> */}
                <ErrorMsg name="dateOfBirth" component="span" />
              </Label>
              <FormGroup>
                <Label>
                  Where did you hear about this event?
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
                  <ErrorMsg name="heardFrom" component="span" />
                </Label>
              </FormGroup>
              <ButtonGroup>
                <Button type="button" onClick={() => onClose({}, null)}>
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
