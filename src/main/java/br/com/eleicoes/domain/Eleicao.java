package br.com.eleicoes.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Eleicao.
 */
@Entity
@Table(name = "eleicao")
public class Eleicao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @NotNull
    @Column(name = "data_inicio", nullable = false)
    private LocalDate dataInicio;

    @NotNull
    @Column(name = "data_fim", nullable = false)
    private LocalDate dataFim;

    @ManyToMany
    @NotNull
    @JoinTable(name = "eleicao_cargo_id",
               joinColumns = @JoinColumn(name = "eleicaos_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "cargo_ids_id", referencedColumnName = "id"))
    private Set<Cargo> cargo_ids = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Eleicao nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public Eleicao dataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
        return this;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataFim() {
        return dataFim;
    }

    public Eleicao dataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
        return this;
    }

    public void setDataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
    }

    public Set<Cargo> getCargo_ids() {
        return cargo_ids;
    }

    public Eleicao cargo_ids(Set<Cargo> cargos) {
        this.cargo_ids = cargos;
        return this;
    }

    public Eleicao addCargo_id(Cargo cargo) {
        this.cargo_ids.add(cargo);
        // cargo.getEleicao_ids().add(this);
        return this;
    }

    public Eleicao removeCargo_id(Cargo cargo) {
        this.cargo_ids.remove(cargo);
        // cargo.getEleicao_ids().remove(this);
        return this;
    }

    public void setCargo_ids(Set<Cargo> cargos) {
        this.cargo_ids = cargos;
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
        Eleicao eleicao = (Eleicao) o;
        if (eleicao.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), eleicao.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Eleicao{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", dataInicio='" + getDataInicio() + "'" +
            ", dataFim='" + getDataFim() + "'" +
            "}";
    }
}
