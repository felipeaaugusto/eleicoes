package br.com.eleicoes.repository;

import br.com.eleicoes.domain.Eleicao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Eleicao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EleicaoRepository extends JpaRepository<Eleicao, Long> {

    @Query(value = "select distinct eleicao from Eleicao eleicao left join fetch eleicao.cargo_ids",
        countQuery = "select count(distinct eleicao) from Eleicao eleicao")
    Page<Eleicao> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct eleicao from Eleicao eleicao left join fetch eleicao.cargo_ids")
    List<Eleicao> findAllWithEagerRelationships();

    @Query("select eleicao from Eleicao eleicao left join fetch eleicao.cargo_ids where eleicao.id =:id")
    Optional<Eleicao> findOneWithEagerRelationships(@Param("id") Long id);

}
