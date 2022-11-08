DROP TABLE recargas;
DROP TABLE tipos_recargas;

CREATE TABLE tipos_recargas(
    id INTEGER NOT NULL PRIMARY KEY,
    descricao VARCHAR2(200),
    valor INTEGER NOT NULL,
);

CREATE TABLE recargas(
    data_recarga DATE DEFAULT SYSDATE,
    data_expiracao DATE,
    data_primeiro_uso DATE,
    id_bilhete INTEGER NOT NULL,
    id_tipo INTEGER NOT NULL,
    CONSTRAINT fk_recarga_bilhete FOREIGN KEY (id_bilhete) REFERENCES bilhetes(id),
    CONSTRAINT fk_recarga_tipo FOREIGN KEY (id_tipo) REFERENCES tipos_recargas(id)
);

INSERT INTO tipos_recargas (id, descricao) VALUES (1, 'Bilhete único (40min)');    
INSERT INTO tipos_recargas (id, descricao) VALUES (2, 'Bilhete duplo (2 x 40min)');
INSERT INTO tipos_recargas (id, descricao) VALUES (3, 'Bilhete de 7 dias');
INSERT INTO tipos_recargas (id, descricao) VALUES (4, 'Bilhete de 30 dias');

COMMIT;