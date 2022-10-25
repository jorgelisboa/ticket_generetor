DROP SEQUENCE seq_codigo_bilhetes;
DROP TABLE bilhetes;

-- Definindo o sequenciamento de um em um para o codigo do bilhete.
CREATE SEQUENCE seq_codigo_bilhetes
    INCREMENT BY 1
    START WITH 1
    MINVALUE 1
    MAXVALUE 10000000;
    
CREATE TABLE bilhetes (
    codigo INTEGER NOT NULL PRIMARY KEY, 
    numero VARCHAR(15) NOT NULL UNIQUE,
    data_geracao DATE DEFAULT SYSDATE
);

COMMIT; 

-- Insere bilhete para teste, para gerar outros bilhetes basta repetir o código várias vezes.
INSERT INTO bilhetes (codigo, numero) VALUES (seq_codigo_bilhetes.nextval, 'EXEMPLO NUMERO BACKEND');
