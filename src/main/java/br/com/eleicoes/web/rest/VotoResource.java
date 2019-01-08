package br.com.eleicoes.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.eleicoes.domain.Voto;
import br.com.eleicoes.repository.VotoRepository;
import br.com.eleicoes.web.rest.errors.BadRequestAlertException;
import br.com.eleicoes.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Voto.
 */
@RestController
@RequestMapping("/api")
public class VotoResource {

    private final Logger log = LoggerFactory.getLogger(VotoResource.class);

    private static final String ENTITY_NAME = "voto";

    private final VotoRepository votoRepository;

    public VotoResource(VotoRepository votoRepository) {
        this.votoRepository = votoRepository;
    }

    /**
     * POST  /votos : Create a new voto.
     *
     * @param voto the voto to create
     * @return the ResponseEntity with status 201 (Created) and with body the new voto, or with status 400 (Bad Request) if the voto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/votos")
    @Timed
    public ResponseEntity<Voto> createVoto(@Valid @RequestBody Voto voto) throws URISyntaxException {
        log.debug("REST request to save Voto : {}", voto);
        if (voto.getId() != null) {
            throw new BadRequestAlertException("A new voto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        List<Voto> votos = votoRepository.findAll();
        for (Voto elem: votos){
            if (elem.getEleicao().getId().equals(voto.getEleicao().getId()) && elem.getCpf().equals(voto.getCpf()) && elem.getCargo().getId().equals(voto.getCargo().getId())) {
                throw new BadRequestAlertException("Este CPF " + voto.getCpf() + " já votou para " + voto.getCargo().getNome() + " na eleição " + voto.getEleicao().getNome(), ENTITY_NAME, "idexists");
            }
        }
        Voto result = votoRepository.save(voto);
        return ResponseEntity.created(new URI("/api/votos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /votos : Updates an existing voto.
     *
     * @param voto the voto to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated voto,
     * or with status 400 (Bad Request) if the voto is not valid,
     * or with status 500 (Internal Server Error) if the voto couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/votos")
    @Timed
    public ResponseEntity<Voto> updateVoto(@Valid @RequestBody Voto voto) throws URISyntaxException {
        log.debug("REST request to update Voto : {}", voto);
        if (voto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Voto result = votoRepository.save(voto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, voto.getId().toString()))
            .body(result);
    }

    /**
     * GET  /votos : get all the votos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of votos in body
     */
    @GetMapping("/votos")
    @Timed
    public List<Voto> getAllVotos() {
        log.debug("REST request to get all Votos");
        return votoRepository.findAll();
    }

    /**
     * GET  /votos/:id : get the "id" voto.
     *
     * @param id the id of the voto to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the voto, or with status 404 (Not Found)
     */
    @GetMapping("/votos/{id}")
    @Timed
    public ResponseEntity<Voto> getVoto(@PathVariable Long id) {
        log.debug("REST request to get Voto : {}", id);
        Optional<Voto> voto = votoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(voto);
    }

    /**
     * DELETE  /votos/:id : delete the "id" voto.
     *
     * @param id the id of the voto to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/votos/{id}")
    @Timed
    public ResponseEntity<Void> deleteVoto(@PathVariable Long id) {
        log.debug("REST request to delete Voto : {}", id);

        votoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
