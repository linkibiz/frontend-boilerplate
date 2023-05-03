import React, { useEffect, useState } from "react";

const downloadVCard = (vcardText) => {
  const vcardBlob = new Blob([vcardText], { type: "text/vcard" });
  const vcardURL = URL.createObjectURL(vcardBlob);
  window.location = vcardURL;
};


const Vcard = ({ vcardData }) => {
  console.log("vcargs", vcardData)
  const { nombre, ocupacion, website, email, celular, apellido, telefono_casa, telefono_trabajo, email_trabajo } =
    vcardData.attributes.vcard;

  const CreateVCard = () => {
    var vCardsJS = require("vcards-js");
    //create a new vCard
    var vCard = vCardsJS();
    //set properties
    vCard.firstName = nombre;
    vCard.lastName = apellido;
    // vCard.organization = "ACME Corporation";
    vCard.workPhone = telefono_trabajo;
    vCard.cellPhone = celular;
    // vCard.birthday = new Date(1985, 0, 1);
    vCard.title = ocupacion;
    vCard.url = `https://${website}`;
    vCard.email = email;
    vCard.homePhone = telefono_casa;
    vCard.workEmail = email_trabajo;

    return vCard.getFormattedString();
  };

  return (
    <button className="font-bold rounded-md border bg-black text-white p-3 w-full" onClick={() => downloadVCard(CreateVCard())}>
      + Guardar contacto
    </button>
  );
};

export default Vcard;
