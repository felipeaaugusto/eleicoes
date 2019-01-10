package br.com.eleicoes.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Voto.
 */
@Entity
@Table(name = "voto")
public class Voto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 11, max = 11)
    @Column(name = "cpf", length = 11, nullable = false)
    private String cpf;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @NotNull
    @Size(min = 19, max = 19)
    @Column(name = "protocolo", length = 19, nullable = false)
    private String protocolo;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private Cargo cargo;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private Candidato candidato;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private Eleicao eleicao;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCpf() {
        return cpf;
    }

    public Voto cpf(String cpf) {
        this.cpf = cpf;
        return this;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getNome() {
        return nome;
    }

    public Voto nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getProtocolo() {
        return protocolo;
    }

    public Voto protocolo(String protocolo) {
        this.protocolo = protocolo;
        return this;
    }

    public void setProtocolo(String protocolo) {
        this.protocolo = protocolo;
    }

    public Cargo getCargo() {
        return cargo;
    }

    public Voto cargo(Cargo cargo) {
        this.cargo = cargo;
        return this;
    }

    public void setCargo(Cargo cargo) {
        this.cargo = cargo;
    }

    public Candidato getCandidato() {
        return candidato;
    }

    public Voto candidato(Candidato candidato) {
        this.candidato = candidato;
        return this;
    }

    public void setCandidato(Candidato candidato) {
        this.candidato = candidato;
    }

    public Eleicao getEleicao() {
        return eleicao;
    }

    public Voto eleicao(Eleicao eleicao) {
        this.eleicao = eleicao;
        return this;
    }

    public void setEleicao(Eleicao eleicao) {
        this.eleicao = eleicao;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Voto voto = (Voto) o;
        if (voto.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), voto.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Voto{" +
            "id=" + getId() +
            ", cpf='" + getCpf() + "'" +
            ", nome='" + getNome() + "'" +
            ", protocolo='" + getProtocolo() + "'" +
            "}";
    }
}
