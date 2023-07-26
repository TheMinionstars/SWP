package swp.server.hotelmanagement.services;


import swp.server.hotelmanagement.dtos.FeedbackRequest;
import swp.server.hotelmanagement.dtos.FeedbackResponse;

import java.util.List;

public interface FeedbackService {
    FeedbackRequest createNewFeedback (FeedbackRequest feedbackRequest);
    List<FeedbackResponse> getAllFeedback();
    List<FeedbackResponse> getFeedbackByRoom(int roomId);
    List<FeedbackResponse> getFeedbackByAccount(int accountId);
    FeedbackRequest updateFeedback(FeedbackRequest feedbackRequest);
    FeedbackResponse getFeedbackById(int feedbackId);


}
