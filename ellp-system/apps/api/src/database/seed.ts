import bcrypt from "bcryptjs";
import pool from "./connection.js";

async function seed() {
  console.log("Executando seed...");

  try {
    const adminHash = await bcrypt.hash("admin123", 10);
    const profHash = await bcrypt.hash("prof123", 10);

    const admin = await pool.query(
      `INSERT INTO profiles (nome, email, senha)
       VALUES ($1, $2, $3)
       ON CONFLICT (email) DO UPDATE SET nome = EXCLUDED.nome
       RETURNING id`,
      ["Administrador ELLP", "admin@ellp.com", adminHash]
    );
    const adminId = admin.rows[0].id;
    await pool.query(
      `INSERT INTO user_roles (user_id, role) VALUES ($1, 'admin')
       ON CONFLICT (user_id) DO UPDATE SET role = 'admin'`,
      [adminId]
    );

    const prof = await pool.query(
      `INSERT INTO profiles (nome, email, senha)
       VALUES ($1, $2, $3)
       ON CONFLICT (email) DO UPDATE SET nome = EXCLUDED.nome
       RETURNING id`,
      ["Professor Exemplo", "professor@ellp.com", profHash]
    );
    const profId = prof.rows[0].id;
    await pool.query(
      `INSERT INTO user_roles (user_id, role) VALUES ($1, 'professor')
       ON CONFLICT (user_id) DO UPDATE SET role = 'professor'`,
      [profId]
    );

    const { rows: countRows } = await pool.query("SELECT COUNT(*) FROM alunos");
    if (parseInt(countRows[0].count) === 0) {
      const aluno1 = await pool.query(
        `INSERT INTO alunos (nome, email, ra) VALUES ($1, $2, $3) RETURNING id`,
        ["Ana Souza", "ana@escola.com", "2024001"]
      );
      const aluno2 = await pool.query(
        `INSERT INTO alunos (nome, email, ra) VALUES ($1, $2, $3) RETURNING id`,
        ["Bruno Lima", "bruno@escola.com", "2024002"]
      );

      const oficina = await pool.query(
        `INSERT INTO oficinas (nome, descricao, professor_id, vagas, status)
         VALUES ($1, $2, $3, $4, 'em_andamento') RETURNING id`,
        [
          "Introducao a Logica de Programacao",
          "Oficina inicial de logica e algoritmos para a comunidade.",
          profId,
          20,
        ]
      );
      const oficinaId = oficina.rows[0].id;

      const aula = await pool.query(
        `INSERT INTO aulas (oficina_id, data, topico)
         VALUES ($1, CURRENT_DATE, $2) RETURNING id`,
        [oficinaId, "Aula 1 - Variaveis e tipos"]
      );
      const aulaId = aula.rows[0].id;

      const mat1 = await pool.query(
        `INSERT INTO matriculas (aluno_id, oficina_id) VALUES ($1, $2) RETURNING id`,
        [aluno1.rows[0].id, oficinaId]
      );
      const mat2 = await pool.query(
        `INSERT INTO matriculas (aluno_id, oficina_id) VALUES ($1, $2) RETURNING id`,
        [aluno2.rows[0].id, oficinaId]
      );

      await pool.query(
        `INSERT INTO presencas (matricula_id, aula_id, presente) VALUES ($1, $2, true)`,
        [mat1.rows[0].id, aulaId]
      );
      await pool.query(
        `INSERT INTO presencas (matricula_id, aula_id, presente) VALUES ($1, $2, false)`,
        [mat2.rows[0].id, aulaId]
      );

      console.log("Dados de exemplo criados (2 alunos, 1 oficina, 1 aula).");
    } else {
      console.log("Ja existem alunos cadastrados; dados de exemplo ignorados.");
    }

    console.log("Seed concluido com sucesso!");
    console.log("Login admin:     admin@ellp.com / admin123");
    console.log("Login professor: professor@ellp.com / prof123");
  } catch (error) {
    console.error("Erro ao executar seed:", error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

seed();
