import { useState } from 'react';

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <main className="page prose">
      <h1>Contact</h1>
      <p>We respond within 24 hours</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input type="text" name="name" required />
        </label>
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Subject
          <input type="text" name="subject" />
        </label>
        <label>
          Message
          <textarea name="message" rows="6" />
        </label>
        <button type="submit">Submit</button>
        {sent && <p className="success-text">Message sent! We'll respond within 24 hours.</p>}
      </form>
      <p>123 Legal Lane, Sydney NSW 2000</p>
    </main>
  );
}
