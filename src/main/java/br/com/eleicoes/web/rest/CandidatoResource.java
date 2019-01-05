package br.com.eleicoes.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.eleicoes.domain.Candidato;
import br.com.eleicoes.repository.CandidatoRepository;
import br.com.eleicoes.web.rest.errors.BadRequestAlertException;
import br.com.eleicoes.web.rest.util.HeaderUtil;
import br.com.eleicoes.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Candidato.
 */
@RestController
@RequestMapping("/api")
public class CandidatoResource {

    private final Logger log = LoggerFactory.getLogger(CandidatoResource.class);

    private static final String ENTITY_NAME = "candidato";

    private final CandidatoRepository candidatoRepository;

    public CandidatoResource(CandidatoRepository candidatoRepository) {
        this.candidatoRepository = candidatoRepository;
    }

    /**
     * POST  /candidatoes : Create a new candidato.
     *
     * @param candidato the candidato to create
     * @return the ResponseEntity with status 201 (Created) and with body the new candidato, or with status 400 (Bad Request) if the candidato has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/candidatoes")
    @Timed
    public ResponseEntity<Candidato> createCandidato(@Valid @RequestBody Candidato candidato) throws URISyntaxException {
        log.debug("REST request to save Candidato : {}", candidato);
        if (candidato.getId() != null) {
            throw new BadRequestAlertException("A new candidato cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Candidato result = candidatoRepository.save(candidato);
        return ResponseEntity.created(new URI("/api/candidatoes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /candidatoes : Updates an existing candidato.
     *
     * @param candidato the candidato to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated candidato,
     * or with status 400 (Bad Request) if the candidato is not valid,
     * or with status 500 (Internal Server Error) if the candidato couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/candidatoes")
    @Timed
    public ResponseEntity<Candidato> updateCandidato(@Valid @RequestBody Candidato candidato) throws URISyntaxException {
        log.debug("REST request to update Candidato : {}", candidato);
        if (candidato.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Candidato result = candidatoRepository.save(candidato);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, candidato.getId().toString()))
            .body(result);
    }

    /**
     * GET  /candidatoes : get all the candidatoes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of candidatoes in body
     */
    @GetMapping("/candidatoes")
    @Timed
    public ResponseEntity<List<Candidato>> getAllCandidatoes(Pageable pageable) {
        log.debug("REST request to get a page of Candidatoes");
        Page<Candidato> page = candidatoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/candidatoes");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /candidatoes/:id : get the "id" candidato.
     *
     * @param id the id of the candidato to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the candidato, or with status 404 (Not Found)
     */
    @GetMapping("/candidatoes/{id}")
    @Timed
    public ResponseEntity<Candidato> getCandidato(@PathVariable Long id) {
        log.debug("REST request to get Candidato : {}", id);
        Optional<Candidato> candidato = candidatoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(candidato);
    }

    /**
     * DELETE  /candidatoes/:id : delete the "id" candidato.
     *
     * @param id the id of the candidato to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/candidatoes/{id}")
    @Timed
    public ResponseEntity<Void> deleteCandidato(@PathVariable Long id) {
        log.debug("REST request to delete Candidato : {}", id);

        candidatoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
