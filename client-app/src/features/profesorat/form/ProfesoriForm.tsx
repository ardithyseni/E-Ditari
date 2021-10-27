import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "./../../../app/stores/store";
import LoadingComponent from "./../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";

export default observer(function ProfesoriForm() {
  const history = useHistory();

  const { profesoriStore } = useStore();
  const {
    loading,
    loadingInitial,
    createProfesori,
    updateProfesori,
    loadProfesori,
  } = profesoriStore;

  const { id } = useParams<{ id: string }>();

  const [profesori, setProfesori] = useState({
    profesoriID: "",
    emri: "",
    mbiemri: "",
    titulli: "",
    datelindja: "",
    adresa: "",
    numriKontaktues: "",
    email: "",
  });

  useEffect(() => {
    if (id) loadProfesori(id).then((profesori) => setProfesori(profesori!));
  }, [id, loadProfesori]);

  function handleSubmitProfesori() {
    if (profesori.profesoriID.length === 0) {
      let newProfesori = {
        ...profesori,
        profesoriID: uuid(),
      };
      createProfesori(newProfesori).then(() =>
        history.push(`/profesorat/${newProfesori.profesoriID}`)
      );
    } else {
      updateProfesori(profesori).then(() =>
        history.push(`/profesorat/${profesori.profesoriID}`)
      );
    }
  }

  function handleProfesoriInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setProfesori({ ...profesori, [name]: value });
  }

  if (loadingInitial)
    return <LoadingComponent content="Loading Profesori..." />;

  return (
    <Segment clearing>
      {/* <Header as="h1">Shto Profesor</Header> */}
      <Form onSubmit={handleSubmitProfesori} autoComplete="off">
        <Form.Input
          placeholder="Emri"
          value={profesori.emri}
          name="emri"
          onChange={handleProfesoriInputChange}
        />
        <Form.Input
          placeholder="Mbiemri"
          value={profesori.mbiemri}
          name="mbiemri"
          onChange={handleProfesoriInputChange}
        />
        <Form.Input
          placeholder="Titulli"
          value={profesori.titulli}
          name="titulli"
          onChange={handleProfesoriInputChange}
        />
        <Form.Input
          type="date"
          placeholder="Ditelindja"
          value={profesori.datelindja}
          name="datelindja"
          onChange={handleProfesoriInputChange}
        />
        <Form.Input
          placeholder="Adresa"
          value={profesori.adresa}
          name="adresa"
          onChange={handleProfesoriInputChange}
        />
        <Form.Input
          placeholder="Numri Kontaktues"
          value={profesori.numriKontaktues}
          name="numriKontaktues"
          onChange={handleProfesoriInputChange}
        />
        <Form.Input
          placeholder="Email"
          value={profesori.email}
          name="email"
          onChange={handleProfesoriInputChange}
        />

        <Button
        as = {Link} to = '/profesorat'
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Aktualizo"
        />
        <Button
          as={Link}
          to="/profesorat"
          floated="right"
          type="button"
          content="Mbyll"
        />
      </Form>
    </Segment>
  );
});
