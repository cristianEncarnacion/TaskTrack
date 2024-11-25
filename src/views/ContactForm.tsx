import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    emailjs
      .sendForm(
        "service_05ai46e",
        "template_h95dc0s",
        form,
        "U8jg9I0efo0qENfgn"
      )
      .then(() => {
        showToast("Mensaje enviado con éxito.");
        form.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        showToast("Error al enviar el mensaje.");
      });
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="mb-10 mt-12">
      <p className="mb-6 text-lg text-center">
        Te gustaría personalizar tu TaskTrack? Puedes contactarme a través de
        este formulario y te responderé lo antes posible.
      </p>
      <div className="flex flex-col justify-center md:flex-row">
        <div className="md:w-3/5">
          <form id="contact-form" className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 font-medium" htmlFor="name">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="Tu nombre"
                name="user_name"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="tu@email.com"
                name="user_email"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="message">
                Mensaje
              </label>
              <textarea
                id="message"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none text-black"
                rows={4}
                placeholder="Tu mensaje aquí"
                name="message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white font-bold px-4 py-2 rounded-lg shadow-lg hover:bg-gradient-to-r hover:shadow-xl transition duration-300 transform hover:scale-105"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
      {toastMessage && (
        <div className="fixed bottom-20 right-20 flex flex-col gap-2">
          <div className="bg-black text-white px-4 py-2 rounded-lg shadow-lg">
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
