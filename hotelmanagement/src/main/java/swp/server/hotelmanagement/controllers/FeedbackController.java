package swp.server.hotelmanagement.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import swp.server.hotelmanagement.dtos.FeedbackRequest;
import swp.server.hotelmanagement.dtos.FeedbackResponse;
import swp.server.hotelmanagement.services.FeedbackService;

import java.util.List;

@RestController
@RequestMapping("/hotel-server/api/v1")
@AllArgsConstructor
public class FeedbackController {
    private final FeedbackService feedbackService;

    @GetMapping("/feedbacks")
    public List<FeedbackResponse> getAllFeedbacks(){
        return feedbackService.getAllFeedback();
    }
    @GetMapping("/feedback/{id}")
    public FeedbackResponse getFeedbackById(@PathVariable(value = "id") int feedbackId){
        return feedbackService.getFeedbackById(feedbackId);
    }
    @GetMapping("/feedbackByRoom/{id}")
    public List<FeedbackResponse> getFeedbackByRoom(@PathVariable(value = "id") int roomId){
        return feedbackService.getFeedbackByRoom(roomId);
    }
    @GetMapping("/feedbackByAccount/{id}")
    public List<FeedbackResponse> getFeedbackByAccount(@PathVariable(value = "id") int accountId){
        return feedbackService.getFeedbackByAccount(accountId);
    }
    @PostMapping("/feedback")
    public FeedbackRequest createNewFeedback(@RequestBody FeedbackRequest feedbackRequest){
        return feedbackService.createNewFeedback(feedbackRequest);
    }
    @PutMapping("/feedback")
    public FeedbackRequest updateFeedback(@RequestBody FeedbackRequest feedbackRequest){
        return feedbackService.updateFeedback(feedbackRequest);
    }

}
