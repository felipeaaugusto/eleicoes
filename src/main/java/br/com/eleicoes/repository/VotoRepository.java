package br.com.eleicoes.repository;

import br.com.eleicoes.domain.Voto;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Voto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VotoRepository extends JpaRepository<Voto, Long> {

}
