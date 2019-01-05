package br.com.eleicoes.repository;

import br.com.eleicoes.domain.Candidato;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Candidato entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CandidatoRepository extends JpaRepository<Candidato, Long> {

}
