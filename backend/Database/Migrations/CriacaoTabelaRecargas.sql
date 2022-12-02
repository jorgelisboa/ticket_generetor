DROP TABLE recargas;
DROP TABLE tipos_recargas;

CREATE TABLE tipos_recargas(
    id INTEGER NOT NULL PRIMARY KEY,
    descricao VARCHAR2(200),
    valor INTEGER NOT NULL
);

CREATE TABLE recargas(
    data_recarga DATE DEFAULT SYSDATE,
    data_expiracao DATE,
    data_primeiro_uso DATE,
    data_ultimo_uso DATE,
    bilhete_status CHAR DEFAULT 'N',
    id_bilhete INTEGER NOT NULL,
    id_tipo INTEGER NOT NULL,
    CONSTRAINT fk_recarga_bilhete FOREIGN KEY (id_bilhete) REFERENCES bilhetes(id),
    CONSTRAINT fk_recarga_tipo FOREIGN KEY (id_tipo) REFERENCES tipos_recargas(id)
);

INSERT INTO tipos_recargas (id, descricao, valor) VALUES (1, 'Bilhete único (40min)', 5);    
INSERT INTO tipos_recargas (id, descricao, valor) VALUES (2, 'Bilhete duplo (2 x 40min)', 10);
INSERT INTO tipos_recargas (id, descricao, valor) VALUES (3, 'Bilhete de 7 dias', 45);
INSERT INTO tipos_recargas (id, descricao, valor) VALUES (4, 'Bilhete de 30 dias', 105);

COMMIT;