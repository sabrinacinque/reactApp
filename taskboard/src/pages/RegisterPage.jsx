import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [type, setType]       = useState('STANDARD');
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:8080/api/v1/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, username, email, password, active: true })
      });
      const body = await res.json();

      if (res.ok && body.success) {
        navigate('/login');
      } else {
        setError(body.message || 'Registrazione fallita');
      }
    } catch {
      setError('Errore di rete');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Registrati</h2>
      <form onSubmit={handleSubmit}>

        <div>
          <label>Tipo utente</label><br/>
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            required
          >
            <option value="STANDARD">Standard</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label>Username</label><br/>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label>Email</label><br/>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label>Password</label><br/>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" style={{ marginTop: '1rem' }}>Registrati</button>
      </form>
    </div>
  );
}
